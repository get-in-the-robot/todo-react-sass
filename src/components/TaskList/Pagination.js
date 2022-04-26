import { MAX_PAGES, NEIGHBOURS, DOTS } from '../../misc/config';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { SettingsContext } from '../../store/Contexts';
import Container from '../UI/Container';
import Button from '../UI/Button';
import GoToModal from './GoToModal';
import { range } from 'lodash';
import {
  ArrowFatLeft as IconArrowFatLeft,
  ArrowFatRight as IconArrowFatRight,
} from 'phosphor-react';
import styles from './Pagination.module.scss';

const Pagination = ({ tasks, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);

  const [currentTasksRange, setCurrentTasksRange] = useState([0, 3]);

  const ctxSettings = useContext(SettingsContext);

  useEffect(() => setItemsPerPage(ctxSettings.itemsPerPage), [ctxSettings]);

  useEffect(() => {
    const pages = Math.ceil(tasks.length / itemsPerPage);
    setTotalPages(pages);
  }, [tasks.length, itemsPerPage]);

  useEffect(() => {
    const start = itemsPerPage * currentPage - itemsPerPage;
    const end = itemsPerPage * currentPage;

    setCurrentTasksRange([start, end]);
  }, [currentPage, totalPages]);

  useEffect(() => {
    onPageChange(tasks.slice(...currentTasksRange));
  }, [tasks, currentTasksRange]);

  const generatePages = useCallback(() => {
    const leftNeighbour = currentPage - NEIGHBOURS;
    const rightNeighbour = currentPage + NEIGHBOURS;
    const showLeftDots = leftNeighbour > 2;
    const showRightDots = rightNeighbour < totalPages - 2;

    switch (true) {
      case totalPages <= MAX_PAGES:
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      case showLeftDots && showRightDots:
        return [
          1,
          DOTS,
          ...range(leftNeighbour, rightNeighbour + 1),
          DOTS,
          totalPages,
        ];
      case showLeftDots && !showRightDots:
        return [1, DOTS, ...range(totalPages - MAX_PAGES + 3, totalPages + 1)];
      case !showLeftDots && showRightDots:
        return [...range(1, MAX_PAGES - 1), DOTS, totalPages];
    }
  });

  const pageChangeHandler = (page) => {
    console.log(page);
    if (modal) {
      setModal(false);
      setCurrentPage(page);
    }

    if (page === '...') setModal(true);
    else setCurrentPage(page);
  };

  const prevPageHandler = () => setCurrentPage((prevState) => --prevState);

  const nextPageHandler = () => setCurrentPage((prevState) => ++prevState);

  const closeModal = () => setModal(false);

  return (
    <>
      {modal &&
        ReactDOM.createPortal(
          <GoToModal onClose={closeModal} onPageChange={pageChangeHandler} />,
          document.querySelector('#overlay')
        )}
      <nav className={styles.pagination}>
        <Container>
          <ul className={styles.pagination__container}>
            {currentPage > 1 && (
              <Button
                onClick={prevPageHandler}
                className={styles.pagination__btn}
              >
                <IconArrowFatLeft weight="fill" />
              </Button>
            )}
            {generatePages().map((page, index) => (
              <Button
                onClick={pageChangeHandler.bind(null, page)}
                className={`${styles.pagination__btn} ${
                  page === currentPage ? styles['pagination__btn--current'] : ''
                }`}
                key={index}
              >
                {page}
              </Button>
            ))}
            {currentPage < totalPages && (
              <Button
                onClick={nextPageHandler}
                className={styles.pagination__btn}
              >
                <IconArrowFatRight weight="fill" />
              </Button>
            )}
          </ul>
        </Container>
      </nav>
    </>
  );
};

export default Pagination;
