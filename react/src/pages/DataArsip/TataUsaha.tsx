import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTataUsaha from '../../components/Tables/TableTataUsaha';

const keuangan = () => {
  return (
    <>
      <Breadcrumb pageName="Bidang Tata Usaha (TU)" />

      <div className="flex flex-col gap-10">
        <TableTataUsaha />
      </div>
    </>
  );
};

export default keuangan;
