import utils from '@/services/utils'

import oneLineInput from './oneLineInput'
import moreLineInput from './moreLineInput'
import numberInput from './numberInput'
import oneSelectInput from './oneSelectInput'
import moreSelectInput from './moreSelectInput'
import dateSelectInput from './dateSelectInput'
import dateRangeInput from './dateRangeInput'
import imgSelect from './imgSelect'
import attachmentSelect from './attachmentSelect'
import explainText from './explainText'
import moneyInput from './moneyInput'
import contactSelect from './contactSelect'
import phoneInput from './phoneInput'
import addressInput from './addressInput'
import formDetail from './formDetail'

let componentList = {
  oneLineInputComponent: oneLineInput.component,
  moreLineInputComponent: moreLineInput.component,
  numberInputComponent: numberInput.component,
  oneSelectInputComponent: oneSelectInput.component,
  moreSelectInputComponent: moreSelectInput.component,
  dateSelectInputComponent: dateSelectInput.component,
  dateRangeInputComponent: dateRangeInput.component,
  imgSelectComponent: imgSelect.component,
  attachmentSelectComponent: attachmentSelect.component,
  explainTextComponent: explainText.component,
  moneyInputComponent: moneyInput.component,
  contactSelectComponent: contactSelect.component,
  phoneInputComponent: phoneInput.component,
  addressInputComponent: addressInput.component,
  formDetailComponent: formDetail.component
}

let setupList = {
  oneLineInputSetup: oneLineInput.setup,
  moreLineInputSetup: moreLineInput.setup,
  numberInputSetup: numberInput.setup,
  oneSelectInputSetup: oneSelectInput.setup,
  moreSelectInputSetup: moreSelectInput.setup,
  dateSelectInputSetup: dateSelectInput.setup,
  dateRangeInputSetup: dateRangeInput.setup,
  imgSelectSetup: imgSelect.setup,
  attachmentSelectSetup: attachmentSelect.setup,
  explainTextSetup: explainText.setup,
  moneyInputSetup: moneyInput.setup,
  contactSelectSetup: contactSelect.setup,
  phoneInputSetup: phoneInput.setup,
  addressInputSetup: addressInput.setup,
  formDetailSetup: formDetail.setup
}

let configList = [
  oneLineInput.config,
  moreLineInput.config,
  numberInput.config,
  oneSelectInput.config,
  moreSelectInput.config,
  dateSelectInput.config,
  dateRangeInput.config,
  imgSelect.config,
  attachmentSelect.config,
  explainText.config,
  moneyInput.config,
  contactSelect.config,
  phoneInput.config,
  addressInput.config,
  formDetail.config
]

export default {
  componentList,
  setupList,
  configList
}
