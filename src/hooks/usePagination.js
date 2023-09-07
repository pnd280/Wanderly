import {
  useEffect,
  useReducer,
} from 'react';

import useDebounce from './useDebounce';

const initialPaginationState = {
  activePageIndex: 1,
  cardPerPage: 3,
  searchTerm: '',
  displayItems: [],
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE_INDEX':
      return state.activePageIndex === action.payload
        ? state
        : {
            ...state,
            activePageIndex: action.payload,
          };
    case 'SET_CARD_PER_PAGE':
      return {
        ...state,
        cardPerPage: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'DISPLAY_ITEM':
      return {
        ...state,
        displayItems: action.payload,
      };
    default:
      return state;
  }
};

const usePagination = (items) => {
  const [{ displayItems, activePageIndex, cardPerPage, searchTerm }, dispatch] =
    useReducer(paginationReducer, initialPaginationState);

  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    items.length > 0 &&
      (function normalizeActivePageIndex() {
        activePageIndex > Math.ceil(items.length / cardPerPage) &&
          setActivePageIndex(Math.ceil(items.length / cardPerPage));
      })();
  }, [activePageIndex, cardPerPage, items.length]);

  const setActivePageIndex = (pageIndex) => {
    dispatch({ type: 'SET_ACTIVE_PAGE_INDEX', payload: pageIndex });
  };

  const setCardPerPage = (cardPerPage) => {
    dispatch({ type: 'SET_CARD_PER_PAGE', payload: cardPerPage });
  };

  const setSearchTerm = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  useEffect(() => {
    debouncedSearchTerm.length > 0
      ? dispatch({
          type: 'DISPLAY_ITEM',
          payload: items
            .filter((item) =>
              item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            )
            .map((item) => item.id),
        })
      : dispatch({
          type: 'DISPLAY_ITEM',
          payload: Array.from({ length: cardPerPage }, (_, i) => {
            return 1 + (activePageIndex - 1) * cardPerPage + i;
          }),
        });
  }, [debouncedSearchTerm, items, cardPerPage, activePageIndex]);

  return [
    { activePageIndex, cardPerPage, debouncedSearchTerm, searchTerm, displayItems },
    { setActivePageIndex, setCardPerPage, setSearchTerm },
  ];
};

export default usePagination;
