import React, { Component } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ValidationErrors from '../ValidationErrors/ValidationErrors'
import './noteform.css'

const defaultState = {
  changedFields: []
}

export default class NoteForm extends Component {
  constructor(props) {
    super(props)
    const { note } = this.props
    this.state = {
      note: { ...note },
      ...defaultState
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      note: { ...nextProps.note },
      ...defaultState
    })
  }

  validateField = (fieldName, value) => {
    // let msg = null
    // typeof value === "string" && (value = value.trim())
    // // do validation
    // switch (fieldName) {
    //   case ""
    // }
    // switch (fieldName) {
    //   case "name":
    //     if (!value) {
    //       msg = "Place name is required";
    //     } else {
    //       if (value.length < 3) {
    //         msg = "Place name must be at least 3 characters";
    //       }
    //     }
    //     break;
    //   case "notes":
    //   case "city":
    //   case "transportation":
    //   case "street_address":
    //     if (!value) {
    //       msg = "This field is required";
    //     }

    // }
    // return msg
  }

  onChange = (fieldName, value) => {
    const changedNote = { ...this.state.note, [fieldName]: value };
    this.setState({
      changedFields: [...new Set([...this.state.changedFields, fieldName])],
      note: changedNote
    }, () => {

    });
  };

  // getValidationMessages(onlyChangedFields = true) {
  //   const validationMessages = 'name city street_address transportation notes'.split(' ')
  //     .reduce((acc, field) => {
  //       const skip = onlyChangedFields && !this.state.changedFields.includes(field)
  //       const msg = skip ? null : this._validateField(field, this.state.place[field])
  //       acc[field] = msg
  //       return acc
  //     }, {})
  //   return validationMessages
  // }
  // formValid() {
  //   return Object.values(this.getValidationMessages(false)).find(i => i !== null) === undefined
  // }
  
  render() {
    // const validationMessages = this.getValidationMessages()
    const { folder, what, where, who, link, highlight, thoughts } = this.state.note
    const { editMode, onNoteCancel, onNoteSubmit } = this.props
    return (
      <div>
      <form className="note-form">
        <div>
          <label htmlFor="folder">Category?</label>
          {!editMode ? (
            null
          ) : (
            <select id="folder" value={folder} /*onChange={changeFolder}*/>
              <option value="1">Watch</option>
              <option value="2">Read</option>
              <option value="3">Listen</option>
              <option value="4">Do</option>
              <option value="5">Eat</option>
              <option value="6">Go</option>
            </select>
          )}
        </div>
        <div>
          <label htmlFor="what">What?</label>
          {!editMode ? (
            what
          ) : (
            <>
              <Input
                onChange={value => this.onChange("what", value)}
                tag="input"
                type="text"
                required={true}
                initialValue={what}
              />
              {/* <ValidationErrors hasError={validationMessages.what} message={validationMessages.what} /> */}
            </>
            )
          }
        </div>
        <div>
          <label htmlFor="where">Where can I find it?</label>
          {!editMode ? (
            where
          ) : (
            <>
              <Input
                onChange={value => this.onChange("where", value)}
                tag="input"
                type="text"
                required={false}
                initialValue={where}
              />
              {/* <ValidationErrors hasError={validationMessages.where} message={validationMessages.where} /> */}
            </>
            )
          }
        </div>
        <div>
          <label htmlFor="who">Who recommended it?</label>
          {!editMode ? (
            who
          ) : (
            <>
              <Input
                onChange={value => this.onChange("who", value)}
                tag="input"
                type="text"
                required={false}
                initialValue={who}
              />
              {/* <ValidationErrors hasError={validationMessages.who} message={validationMessages.who} /> */}
            </>
            )
          }
        </div>
        <div>
          <label htmlFor="link">Link</label>
          {!editMode ? (
            link
          ) : (
            <>
              <Input
                onChange={value => this.onChange("link", value)}
                tag="input"
                type="text"
                required={false}
                initialValue={link}
              />
              {/* <ValidationErrors hasError={validationMessages.name} message={validationMessages.name} /> */}
            </>
            )
          }
        </div>
        <div>
          <label htmlFor="highlight">Highlight?</label>
          {!editMode ? (
            highlight
          ) : (
            <>
              <Input
                onChange={value => this.onChange("highlight", value)}
                tag="input"
                type="checkbox"
                required={false}
                initialValue={highlight}
              />
              {/* <ValidationErrors hasError={validationMessages.highlight} message={validationMessages.highlight} /> */}
            </>
            )
          }
        </div>
        <div>
          <label htmlFor="thoughts">Notes</label>
          {!editMode ? (
            thoughts
          ) : (
            <>
              <Input
                onChange={value => this.onChange("thoughts", value)}
                tag="input"
                type="textarea"
                required={false}
                initialValue={thoughts}
              />
              {/* <ValidationErrors hasError={validationMessages.thoughts} message={validationMessages.thoughts} /> */}
            </>
            )
          }
        </div>
      </form>
      {editMode ? (
        <div className="button-container">
          <Button btnType="submit" btnText="Save" btnClass="note-btn" onClick={(e) => onNoteSubmit(e)}/>
          <Button btnType="button" btnText="Cancel" btnClass="note-btn" onClick={(e) => onNoteCancel(e)} />
        </div>
      ) : null}
      </div>
    )
  }
}