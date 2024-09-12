import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const Kemasyarakatan = () => {
  return (
    <>
      <Breadcrumb pageName="Bidang Kemasyarakatan" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Kemasyarakatan" />
      </div>
    </>
  );
};

export default Kemasyarakatan;
