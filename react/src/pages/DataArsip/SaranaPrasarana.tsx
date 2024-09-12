import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const SaranaPrasarana = () => {
  return (
    <>
      <Breadcrumb pageName="Sarana Prasarana" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Sarana Prasarana" />
      </div>
    </>
  );
};

export default SaranaPrasarana;
