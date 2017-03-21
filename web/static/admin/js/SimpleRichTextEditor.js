import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from 'react-rte';
import autobind from 'class-autobind';

import type {EditorValue} from 'react-rte/lib/RichTextEditor';

type Props = {
    value: string;
    format: string;
    onChange: (value: string) => any;
};
type State = {
    editorValue: EditorValue;
};

export default class SimpleRichTextEditor extends Component {
    props: Props;
    state: State;
    _currentValue: ?[string, string];
		      
    constructor() {
      super(...arguments);
      autobind(this);
      this.state = {
	editorValue: createEmptyValue(),
      };
    }
		      
    componentWillMount() {
      this._updateStateFromProps(this.props);
    }
    componentWillReceiveProps(newProps: Props) {
      this._updateStateFromProps(newProps);
    }
    _updateStateFromProps(newProps: Props) {
      let {value, format} = newProps;
      if (this._currentValue != null) {
        let [currentValue, currentFormat] = this._currentValue;
        if (format === currentFormat && value === currentValue) {
          return;
        }
      }
      let {editorValue} = this.state;
      this.setState({
        editorValue: editorValue.setContentFromString(value, format),
      });
      this._currentValue = [format, value];
    }
    render() {
      let {value, format, onChange, ...otherProps} = this.props;
      return (
        <RichTextEditor
           {...otherProps}
           value={this.state.editorValue}
           onChange={this._onChange}
        />
      );
    }
		      
    _onChange(editorValue: EditorValue) {
      let {format, onChange} = this.props;
      let oldEditorValue = this.state.editorValue;
      this.setState({editorValue});
      let oldContentState = oldEditorValue ? oldEditorValue.getEditorState().getCurrentContent() : null;
      let newContentState = editorValue.getEditorState().getCurrentContent();
      if (oldContentState !== newContentState) {
        let stringValue = editorValue.toString(format);
        this._currentValue = [format, stringValue];
        if (onChange && stringValue !== this.props.value) {
          onChange(stringValue);
        }
      }
    }
  }
