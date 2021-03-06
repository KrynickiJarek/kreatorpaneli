import types from "./types"


const INITIAL_STATE = {
  iconHolders: [],
  iconHoldersRender: false,
  favoriteIcons: [],
  favoriteIconsRender: false,
  isAnySelected: false,
}

const iconReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_ICON_HOLDERS:
      return {
        ...state, iconHolders: action.item, iconHoldersRender: !state.iconHoldersRender
      }
    // case types.UPDATE_ICON_HOLDERS:
    //   const updatedIconHolders = state.iconHolders
    //   let propertytype = action.property
    //   updatedIconHolders[action.index].propertytype = action.item
    //   return {
    //     ...state, iconHolders: updatedIconHolders, iconHoldersRender: !state.iconHoldersRender
    // }
    case types.ADD_ICON_TO_FAVORITE:
      const copyFavoriteIcons = state.favoriteIcons;
      if (copyFavoriteIcons.indexOf(action.item) === -1) {
        copyFavoriteIcons.push(action.item)
      }
      else {
        copyFavoriteIcons.splice((copyFavoriteIcons.indexOf(action.item)), 1)
      }
      return {
        ...state, favoriteIcons: copyFavoriteIcons, favoriteIconsRender: !state.favoriteIconsRender
      }
    case types.REMOVE_ICON_FROM_FAVORITE:
      return {
        ...state, favoriteIcons: [...state.favoriteIcons.filter(function (element) { return element !== action.item })], favoriteIconsChange: !state.favoriteIconsChange
      }
    case types.IS_ANY_SELECTED:
      return {
        ...state, isAnySelected: action.item
      }
    default:
      return state
  }
}

export default iconReducer