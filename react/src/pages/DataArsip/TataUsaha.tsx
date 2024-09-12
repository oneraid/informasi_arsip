import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const TataUsaha = () => {
  return (
    <>
      <Breadcrumb pageName="Bidang Tata Usaha" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Tata Usaha" />
      </div>
    </>
  );
};

export default TataUsaha;
