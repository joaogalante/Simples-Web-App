//@flow
import {getTromso} from '../config/tromso'

class IndividualEntity implements Model {
  id: number
  name: string
  code: string

  static fromQuery(response): IndividualEntity {
    const m = new IndividualEntity()
    m.id = response.id
    m.name = response.name
    m.code = response.code
    return m
  }

  // toQueryParams(): QueryParams {}
}

getTromso().generateAuthModelResource(IndividualEntity, 'api/individuals/')

export default IndividualEntity
