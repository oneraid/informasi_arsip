import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableKeuangan';

const keuangan = () => {
  return (
    <>
      <Breadcrumb pageName="Bidang Keuangan" />

      <div className="flex flex-col gap-10">
        <TableKeuangan />
      </div>
    </>
  );
};

export default keuangan;
