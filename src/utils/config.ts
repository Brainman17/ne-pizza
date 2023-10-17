type SortListItem = {
  name: string;
  sortProperty: string;
}

const sortArray: SortListItem[] = [
  {
    name: "популярности(DESC)",
    sortProperty: "rating",
  },
  {
    name: "популярности(ASC)",
    sortProperty: "-rating",
  },
  {
    name: "цене(DESC)",
    sortProperty: "price",
  },
  {
    name: "цене(ASC)",
    sortProperty: "-price",
  },
  {
    name: "алфавиту(DESC)",
    sortProperty: "title",
  },
  {
    name: "алфавиту(ASC)",
    sortProperty: "-title",
  }
];

export default sortArray;