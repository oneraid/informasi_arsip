import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const Pemerintahan = () => {
  return (
    <>
      <Breadcrumb pageName="Pemerintahan" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Pemerintahan" />
      </div>
    </>
  );
};

export default Pemerintahan;
