import Container from '../UI/Container';
import FolderFilter from './FolderFilter';
import SortButton from './SortButton';
import SearchBar from '../UI/SearchBar';
import styles from './Filters.module.scss';

const Filters = ({ onSearch }) => {
  return (
    <section>
      <Container className={styles.filters}>
        <FolderFilter className={styles.filters__select} />

        <SortButton sortMethod="alph_asc" className={styles.filters__btn}>
          <span>Name</span>
        </SortButton>

        <SortButton sortMethod="date_asc" className={styles.filters__btn}>
          <span>Date</span>
        </SortButton>

        <SearchBar
          onSearch={onSearch}
          placeholder="Search..."
          className={styles['filters__input']}
        />
      </Container>
    </section>
  );
};

export default Filters;
