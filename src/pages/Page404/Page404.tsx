import ErrorPage from '@shared/ui/ErrorPage';
import errorImage from '@shared/assets/icons/error_404.png';
import Layout from './layout';

const Page404 = () => {
  const handleReportClick = () => {
    console.log('404 Error reported by user');
  };

  return (
    <Layout>
      <ErrorPage
      imagePath={errorImage}
      title="Страница не найдена"
      description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
      altText="Иллюстрация ошибки 404 - страница не найдена"
      onReportClick={handleReportClick}
    />
    </Layout>
  );
};

export default Page404;
