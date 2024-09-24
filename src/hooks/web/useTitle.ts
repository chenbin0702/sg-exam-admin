import { watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '/@/hooks/setting';
import { useRouter } from 'vue-router';
import { useLocaleStore } from '/@/store/modules/locale';

import { REDIRECT_NAME } from '/@/router/constant';
import dayjs from 'dayjs';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const localeStore = useLocaleStore();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
      if(route.path==='/share/homework'){
        let query=route.query;
        let date=query.date?dayjs(query.date).format('YYYY-MM-DD HH:mm:ss'):'';
        let type=query.type==0?'学校作业':'补习作业';
        pageTitle.value = ` ${type}:${query.title} -${query.grade}- ${query.courseName}- ${query.studentName} - ${date}`;
      }
    },
    { immediate: true },
  );
}
