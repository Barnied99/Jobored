# JOBORED[]

Сделано небольшое приложение для поиска работы.

### React(v.18.2)&Next(v.13.4)

-   Функциональные компоненты c хуками в приоритете над классовыми.
-   Есть разделение на умные и глупые компоненты.
-   Есть рендеринг списков: [DefaultContainer](https://github.com/Barnied99/Jobored/blob/main/src/components/common/component/ui/DefaultContainer/index.tsx) и т.д.
-   Реализована хотя бы одна форма: [AuthForm](https://github.com/Barnied99/Jobored/blob/main/src/components/auth/api/localauth/index.tsx).
-   Есть применение предохранителя: [ErrorBoundary](https://github.com/Barnied99/Jobored/blob/main/src/components/ErrorBoundary/ErrorBoundary.tsx).
-   Есть хотя бы один кастомный хук: [use-validation](https://github.com/Barnied99/Jobored/blob/main/src/utills/use-validation.ts).
-   Компонент с SSR: [Vacancies](https://github.com/Barnied99/Jobored/blob/main/src/pages/vacancies.tsx).

### Redux

-   Используем Modern Redux with Redux Toolkit: [store](https://github.com/Barnied99/Jobored/blob/main/src/store/store/store.ts).
-   Используем слайсы: [change-favorites](https://github.com/Barnied99/Jobored/blob/main/src/store/slice/change-favorite.ts) / 
[user-slice](https://github.com/Barnied99/Jobored/blob/main/src/store/slice/user-slice.ts).
-   Есть хотя бы одна кастомная мидлвара: [saveUserData](https://github.com/Barnied99/Jobored/blob/main/src/store/store/saveUserData.ts).
-   Используется React Query [Vacancies](https://github.com/Barnied99/Jobored/blob/main/src/pages/vacancies.tsx) /
[Favorites](https://github.com/Barnied99/Jobored/blob/main/src/pages/favorites.tsx) и т.д.

## Дополнительно
- Использован NextJs.
- Использована библиотека react-hook-form для форм регистрации и входа.
- Использована библиотека yup для валидации данных.
- Использована библиотека mantine.
- Написан небольшой proxy-server для обхода cors политики.
- Написан serviceworker(не используется).
- Использован TypeScript.
- Есть применение lazy + Suspense/NextDynamic.




