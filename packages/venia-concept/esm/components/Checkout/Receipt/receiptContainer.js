import { connect } from "@magento/venia-drivers";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import actions from "../../../actions/checkoutReceipt";
import { continueShopping, createAccount } from "../../../actions/checkout";
import Receipt from "./receipt";
import { getOrderInformation } from "../../../selectors/checkoutReceipt";
const {
  reset
} = actions;

const mapStateToProps = state => ({
  order: getOrderInformation(state)
});

const mapDispatchToProps = {
  continueShopping,
  createAccount,
  reset
};
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Receipt);
//# sourceMappingURL=receiptContainer.js.map