import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = store => {
    return {
        auth: store.auth,
    }
};

const ProfileContainer = connect(
    mapStateToProps
)(Profile);

export default ProfileContainer;