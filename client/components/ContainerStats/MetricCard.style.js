export const styles = { 
  flex_card : {
    boxSizing: 'border-box',
    color: 'white',
    backgroundColor : '#2c3e50',
    minWidth: '30%',
    height: '150px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'grid',
    transition: 'transform ease-in-out .3s',
    '&:hover' : {
      transform: 'scale(1.05, 1.05)'
    }
  },
  grid_item_icon : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumn: 1,
    gridRow: '1 / span 2',
  },

  grid_item_title : {
    marginTop: '16px',
    textAlign: 'center',
    wordWrap: 'break-word',
    fontSize: '1.8em',
    gridColumn: 1,
    gridRow: 1,
  },

  grid_item_value : {
    fontSize: '3.5em',
    fontWeight: 'bolder',
    textAlign: 'center',
    gridColumn: 1,
    gridRow: 2
  }
}
