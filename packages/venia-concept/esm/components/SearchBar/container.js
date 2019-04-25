import { connect } from "@magento/venia-drivers";
import { executeSearch } from "../../actions/app";
import SearchBar from "./searchBar";

const mapStateToProps = ({
  app
}) => ({
  app
});

const mapDispatchToProps = {
  executeSearch
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
//# sourceMappingURL=container.js.map