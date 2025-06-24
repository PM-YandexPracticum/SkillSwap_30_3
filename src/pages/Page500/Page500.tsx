import ErrorPage from '@shared/ui/ErrorPage';
import errorImage from '@shared/assets/icons/error_500.png';
import PageLayoutConector from '../PageLayoutConnector';

const Page500 = () => {
  const handleReportClick = () => {
    console.log('500 Error reported by user');
  };

  return (
    <PageLayoutConector>
      <ErrorPage
      imagePath={errorImage}
      title="На сервере произошла ошибка"
      description="Попробуйте позже или вернитесь на главную страницу"
      altText="Иллюстрация ошибки 500 - внутренняя ошибка сервера"
      onReportClick={handleReportClick}
    />
    </PageLayoutConector>
  );
};

export default Page500;
