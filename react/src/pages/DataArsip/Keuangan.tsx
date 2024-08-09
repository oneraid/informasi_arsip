import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';

const keuangan = () => {
  return (
    <>
      <Breadcrumb pageName="Bidang Keuangan" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default keuangan;
