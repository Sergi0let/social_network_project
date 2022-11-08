import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => this.setState({ status: e.target.value });

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }
  render() {
    const { editMode, status } = this.state;
    return (
      <div>
        {!editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'No STATUS'}
            </span>
          </div>
        )}
        {editMode && (
          <div>
            <input
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              type="text"
              value={status}
              onChange={this.onStatusChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
