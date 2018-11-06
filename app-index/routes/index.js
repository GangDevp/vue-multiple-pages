
//^import_component
import BookList from 'index/views/book-list';
import BookDetail from 'index/views/book-detail';
//$import_component

export const indexRoutes = [
  {
    path: '/',
    name: 'bookList',
    component: BookList
  },
  {
    path: '/bookDetail',
    name: 'bookDetail',
    component: BookDetail
  }
];