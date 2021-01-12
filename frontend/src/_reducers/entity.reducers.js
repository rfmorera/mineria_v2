import { entityConstants } from '../_constants/entity.constants'


const initialState = {
  loadingEntitiesList: false,
  entitiesList: [],
  entitiesCounter: 0,
  entitiesListErrorMessage: '',
  deletingEntity: false,
  deletingEntityErrorMessage: '',
  creatingEntity: false,
  loadingEntity: false,
  entity: {},
  entityErrorMessage: '',
  updatingEntity: false,
  updatingEntityErrorMessage: ''
}

export function entities(state = initialState, action) {
  switch (action.type) {
    // GET_ENTITY
    case entityConstants.GET_ENTITY_REQUEST:
      return {
        ...state,
        loadingEntity: true,
        entityErrorMessage: ''
      }
    case entityConstants.GET_ENTITY_SUCCESS:
      return {
        ...state,
        loadingEntity: false,
        entity: action.results,
      }
    case entityConstants.GET_ENTITY_FAILURE:
      return {
        ...state,
        loadingEntity: false,
        entityErrorMessage: action.error
      }
    // PUT_ENTITY
    case entityConstants.PUT_ENTITY_REQUEST:
      return {
        ...state,
        updatingEntity: true,
        updatingEntityErrorMessage: ''
      }
    case entityConstants.PUT_ENTITY_SUCCESS:
      return {
        ...state,
        updatingEntity: false,
        entity: action.results,
      }
    case entityConstants.PUT_ENTITY_FAILURE:
      return {
        ...state,
        updatingEntity: false,
        updatingEntityErrorMessage: action.error
      }

    // GET_ENTITIES
    case entityConstants.GET_ENTITIES_REQUEST:
      return {
        ...state,
        loadingEntitiesList: true
      }
    case entityConstants.GET_ENTITIES_SUCCESS:
      return {
        ...state,
        loadingEntitiesList: false,
        entitiesList: action.results,
        entitiesCounter: action.entitiesCounter
      }
    case entityConstants.GET_ENTITIES_FAILURE:
      return {
        ...state,
        loadingEntitiesList: false,
        entitiesListErrorMessage: action.error
      }

    // POST_ENTITY
    case entityConstants.POST_ENTITY_REQUEST:
      return {
        ...state,
        creatingEntity: true,
        entityErrorMessage: ''
      }
    case entityConstants.POST_ENTITY_SUCCESS:
      return {
        ...state,
        creatingEntity: false,
        entity: action.results,
      }
    case entityConstants.POST_ENTITY_FAILURE:
      return {
        ...state,
        creatingEntity: false,
        entityErrorMessage: action.error
      }

    // DELETE_ENTITY
    case entityConstants.DELETE_ENTITY_REQUEST:
      return {
        ...state,
        deletingEntity: true,
        deletingEntityErrorMessage: ''
      }
    case entityConstants.DELETE_ENTITY_SUCCESS:
      let { entitiesList, entitiesCounter } = state
      entitiesCounter -= 1
      entitiesList = entitiesList.filter(item => item.id !== action.id)
      return {
        ...state,
        entitiesCounter: entitiesCounter,
        entitiesList: entitiesList,
        deletingEntity: false
      }
    case entityConstants.DELETE_ENTITY_FAILURE:
      return {
        ...state,
        deletingEntity: false,
        deletingEntityErrorMessage: action.error
      }
    case entityConstants.CLEAR_ENTITY:
      return {
        ...state,
        ...initialState,
      }

    default:
      return state
  }
}
