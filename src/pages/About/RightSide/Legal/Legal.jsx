import { useTranslation } from "react-i18next";
import { Content } from "../../style/content.style";


export const Legal = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <h1>{t("about.legal")}</h1>
      <p>За многолетний опыт работы в разных сферах мы сформировали базу эффективных решений и наработок, научились глубоко понимать потребности пользователей и бизнеса, выработали чувство рынка, тенденций и трендов, понимание - какие из действий по-настоящему результативны</p>
      <p>За многолетний опыт работы в разных сферах мы сформировали базу эффективных решений и наработок, научились глубоко понимать потребности пользователей и бизнеса, выработали чувство рынка, тенденций и трендов, понимание - какие из действий по-настоящему результативны</p>
      <h2>Подзаголовок 2</h2>
      <p>За многолетний опыт работы в разных сферах мы сформировали базу эффективных решений и наработок, научились глубоко понимать потребности пользователей и бизнеса, выработали чувство рынка, тенденций и трендов, понимание - какие из действий по-настоящему результативны</p>
      <h2>Подзаголовок 3</h2>
      <p>За многолетний опыт работы в разных сферах мы сформировали базу эффективных решений и наработок, научились глубоко понимать потребности пользователей и бизнеса, выработали чувство рынка, тенденций и трендов, понимание - какие из действий по-настоящему результативны</p>
    </Content>
  );
};