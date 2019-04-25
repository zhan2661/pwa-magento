import { connect } from "@magento/venia-drivers";
import SignIn from "./signIn";
import { signIn, assignGuestCartToCustomer } from "../../actions/user";

const mapStateToProps = ({
  user
}) => {
  const {
    signInError
  } = user;
  return {
    signInError
  };
};

const mapDispatchToProps = {
  signIn,
  assignGuestCartToCustomer
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
//# sourceMappingURL=container.js.map