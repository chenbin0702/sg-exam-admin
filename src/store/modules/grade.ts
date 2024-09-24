import { defineStore } from 'pinia';
import {store} from '/@/store';
import { schoolStages} from '/@/data/grade'

export const useGradeStore = defineStore({
    id: 'grade',
    state: () => ({
        stageOptions: [
            { label: '小学', value: '小学' },
            { label: '初中', value: '初中' },
            { label: '高中', value: '高中' },
        ],
        gradeOptions:[],
        courseOptions: [],
    }),
    actions: {
       setGradeOptions(stage) {
            const selectedStage = schoolStages.find(s => s.stage === stage);
            this.gradeOptions = selectedStage.grades.map(g => ({
                label: g.yearName,
                value: g.yearName
            }));
        },
        setCourseOptions(stage,grade) {
          const selectedStage = schoolStages.find(s => s.stage === stage);
          const selectedGrade = selectedStage?.grades.find(g => g.yearName === grade);
          this.courseOptions= Object.keys(selectedGrade.courses).map(course => ({
            label: course,
            value: course,
          }));
        }

    }
});
