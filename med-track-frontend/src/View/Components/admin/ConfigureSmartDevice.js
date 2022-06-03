import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { withTranslation } from 'react-i18next'
import * as Constants from "../util/Constants";
import DefaultLoader from "../ui/Loader";
import delay from "../util/DelayUtil";

class ConfigureSmartDeviceForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      deviceIp: '',
      serverIp: '',
      serverPort: '',
      placementId: '',
      buttonDisabled: false,
      isLoaded: true
    }
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      buttonDisabled: false,
      isLoaded: true
    })
  }

  submitForm(){
    this.setState({
      buttonDisabled: false,
      isLoaded: false
    })

    this.configureDevice();
  }

  async configureDevice() {
    const bytes = this.state.serverIp.split('.');
    try{
      await delay();
      let res = await fetch(
        `http://${this.state.deviceIp}/?firstByte=${bytes[0]}&secondByte=${bytes[1]}&thirdByte=${bytes[2]}&fourthByte=${bytes[3]}&port=${this.state.serverPort}&placementId=${this.state.placementId}`
      )
      if (res.status === 200) {
        this.resetForm()
        this.setState({isSuccess: true, isFailed: false})
      }
    }
    catch(e){
      console.log(e)
      this.resetForm()
      this.setState({isSuccess: false, isFailed: true})
    }
  }

  render() {
    const {t} = this.props
    const inputClass = Constants.INPUT_STYLE_CLASSES;
    if (!this.state.isLoaded) return <DefaultLoader height={425} width={425} isCentered={false}/>
    return(
        <div
            className="w3-container w3-card-4 w3-light-grey w3-text-indigo w3-margin"
            style={{width: "700px", fontSize: "22px"}}>
          <h1 className="w3-center">{t('ConfigureDevice')}</h1>
          <div className="sized-font w3-center">
            {this.state.isSuccess && <p>{t("SuccessConfiguring")}</p>}
            {this.state.isFailed && <p className="w3-text-red">{t("FailedConfiguring")}</p>}
          </div>
          <label> {t('DeviceIp')}</label>
          <Input
            className={inputClass}
            type = 'text'
            value={this.state.deviceIp ? this.state.deviceIp : ''}
            onChange = { (val) => this.setInputValue('deviceIp', val)}
          />
          <label>{t('ServerIp')}</label>
          <Input
            className={inputClass}
            type = 'text'
            value={this.state.serverIp ? this.state.serverIp : ''}
            onChange = { (val) => this.setInputValue('serverIp', val)}
          />
          <label>{t('ServerPort')}</label>
          <Input
            className={inputClass}
            type = 'text'
            value={this.state.serverPort ? this.state.serverPort : ''}
            onChange = { (val) => this.setInputValue('serverPort', val)}
          />
          <label>{t('PlacementId')}</label>
          <Input
            className={inputClass}
            type = 'text'
            value={this.state.placementId ? this.state.placementId : ''}
            onChange = { (val) => this.setInputValue('placementId', val)}
          />
          <Button
            className="w3-btn w3-block w3-section w3-indigo w3-padding"
            text = {t('Configure')}
            disabled = {this.state.buttonDisabled}
            onClick = { () => this.submitForm()}
          />
      </div>
    )
  }
}

export default withTranslation() (ConfigureSmartDeviceForm);
