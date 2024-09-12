import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const PembangunanEkonomi = () => {
  return (
    <>
      <Breadcrumb pageName="Pembangunan Ekonomi" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Pembangunan Ekonomi" />
      </div>
    </>
  );
};

export default PembangunanEkonomi;
