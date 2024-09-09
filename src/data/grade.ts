interface Grade {
  year: number;
  courses: Record<string, boolean>;
  yearName?: string;
}

interface SchoolStage {
  stage: string;
  grades: Grade[];
}
import { FormSchema} from '/@/components/Table';
export const schoolStages: SchoolStage[] = [
  {
    stage: '小学',
    grades: [
      {
        year: 1,
        yearName:'一年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
      {
        year: 2,
        yearName:'二年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
      {
        year: 3,
        yearName:'三年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
      {
        year: 4,
        yearName:'四年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
      {
        year: 5,
        yearName:'五年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
      {
        year: 6,
        yearName:'六年级',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          科学: true,
          音乐: true,
          体育: true,
          美术: true,
          道德与法治:true
        },
      },
    ],
  },
  {
    stage: '初中',
    grades: [
      {
        year: 7,
        yearName:'初一',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
          音乐: true,
          体育: true,
          美术: true,
        },
      },
      {
        year: 8,
        yearName:'初二',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
          音乐: true,
          体育: true,
          美术: true,
        },
      },
      {
        year: 9,
        yearName:'初三',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
          音乐: true,
          体育: true,
          美术: true,
        },
      },
    ],
  },
  {
    stage: '高中',
    grades: [
      {
        year: 10,
        yearName:'高一',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
        },
      },
      {
        year: 11,
        yearName:'高二',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
        },
      },
      {
        year: 12,
        yearName:'高三',
        courses: {
          语文: true,
          数学: true,
          英语: true,
          物理: true,
          化学: true,
          生物: true,
          地理: true,
          历史: true,
          政治: true,
  
        },
      },
    ],
  },
];

// 更新年级选项
export function updateGradeOptions(stage: string,formSchema: FormSchema[]) {
  const selectedStage = schoolStages.find(s => s.stage === stage);
  const stageField = formSchema.find(f => f.field === 'stage');
  stageField.componentProps.value = stage;
  if (selectedStage) {
    const gradeField = formSchema.find(f => f.field === 'grade');
    const courseNameField = formSchema.find(f => f.field === 'courseName');
    if (gradeField && courseNameField) {
      // 清空年级和课程的值
      gradeField.componentProps.value = '';
      courseNameField.componentProps.value = '';
      // 清空课程的选项
      courseNameField.componentProps.options = [];
      // 更新年级的选项
      gradeField.componentProps = gradeField.componentProps || {};
      gradeField.componentProps.options = selectedStage.grades.map(g => ({
        label:g.yearName,
        value:g.yearName,
      }));
    }
  } 
}
// 更新科目选项
export function updateSubjectOptions(grade: string,formSchema: FormSchema[]) {
  const stageField = formSchema.find(f => f.field === 'stage');
  const selectedStage = stageField && schoolStages.find(s => s.stage === stageField?.componentProps?.value);
console.log('first', selectedStage)
  if (selectedStage) {
    const selectedGrade = selectedStage.grades.find(g => g.yearName == grade);
    if (selectedGrade) {
      const gradeField = formSchema.find(f => f.field === 'grade');
      gradeField.componentProps.value = grade;
      const subjects = Object.keys(selectedGrade.courses);
      const subjectField = formSchema.find(f => f.field === 'courseName');
      if (subjectField) {
        subjectField.componentProps = subjectField.componentProps || {};
        subjectField.componentProps.options = subjects.map(subject => ({
          label: subject,
          value: subject,
        }));
      }
    } 
  }
}
