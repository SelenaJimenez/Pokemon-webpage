import React from 'react';
import Form from 'react-bootstrap/Form';
import { Controller, useWatch, useFormContext } from 'react-hook-form';
import BsPagination from 'react-bootstrap/Pagination';

const Pagination = () => {
  const { setValue } = useFormContext();

  const [loading, page, total, pages, cantidad] = useWatch({
    name: ['loadingPokemons', 'page', 'total', 'pages', 'cantidad'],
  });

  const onClickPage = (numberPage) => () => {
    setValue('page', numberPage);
  };

  const onChangeCantidad = (evt) => {
    setValue('page', 1);
    setValue('cantidad', +evt.target.value);
  };

  return (
    <div className="pagination">
      <BsPagination>
        <BsPagination.First onClick={onClickPage(1)} disabled={loading} />
        <BsPagination.Prev onClick={onClickPage(page - 1)} disabled={page === 1 || loading} />
        {pages.map((item) => (
          <BsPagination.Item key={item} active={item === page} onClick={onClickPage(item)} disabled={loading}>
            {item}
          </BsPagination.Item>
        ))}
        <BsPagination.Next onClick={onClickPage(page + 1)} disabled={page === total || loading} />
        <BsPagination.Last onClick={onClickPage(total)} disabled={loading} />
      </BsPagination>


      <div className='counter-form'>
        <Form.Group>
          <Form.Label>Show per page:</Form.Label>
          <Form.Select disabled={loading} onChange={onChangeCantidad} value={cantidad}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default Pagination;
