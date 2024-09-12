import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableKeuangan from '../../components/Tables/TableArsip';

const SusunanProgram = () => {
  return (
    <>
      <Breadcrumb pageName="Susunan Program" />

      <div className="flex flex-col gap-10">
        <TableKeuangan filterByBidang="Susunan Program" />
      </div>
    </>
  );
};

export default SusunanProgram;
