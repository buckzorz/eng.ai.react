import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadPosts,
  selectPosts,
} from './tableData';

import { Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Input, Button, FormLabel} from '@material-ui/core'

import RowModal from '../modal/index'
import styled from 'styled-components'

const InputWrap = styled.div`
  width: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 50px;
`;

const TableBodyRow = styled(TableRow)`
  cursor: pointer;
  &:hover{
    background-color: lightgray;
  }
`;

const EqualCell = styled(TableCell)`
  width: 25%;
`;

export function TableComponent() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    const table = document.getElementById('data-table');
    window.addEventListener('scroll', () => {
      if((table.clientHeight + table.offsetTop) - (window.scrollY + window.innerHeight) < 5){
        dispatch(loadPosts());
      }
    })
    dispatch(loadPosts());
    loadData();
  }, [])

  useEffect(() => {
    if(filter || searchQuery){
      let res;
      if(filter){
        res = filterPosts(posts, filter);
      }
      if(searchQuery){
        res = filterByQuery(posts, searchQuery)
      }
      setDisplayPosts(res);
    } else {
      setDisplayPosts(posts)
    }
  }, [posts, filter, searchQuery])

  const loadData = () => {
    setTimeout(() => {
      dispatch(loadPosts());
      loadData();
    }, 10000)
  }

  const filterPosts = (posts, filter) => {
    let res = [...posts].sort((a, b) => {
      const val1 = a[filter].toLowerCase();
      const val2 = b[filter].toLowerCase();

      if(val1 < val2){
        return filter ? -1 : 1
      }
      if(val1 > val2){
        return filter ? 1 : -1
      }

      return 0
    })

    return res
  }

  const filterByQuery = (posts, query) => {
    const res = [...posts].filter((post) => {
        let title = post.title ? post.title.toLowerCase().includes(query.toLowerCase()) : false;
        let url = post.url ? post.url.toLowerCase().includes(query.toLowerCase()) : false;
        let author = post.author ? post.author.toLowerCase().includes(query.toLowerCase()) : false;
        return ( title || url || author )
    })
    return res
  }

  const handleModal = (row) => {
    setModalContent(row);
    setIsModalOpen(true);
  }

  return (
    <TableWrap>
      <RowModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalContent={modalContent}/>
      <InputWrap>
        <FormLabel>Entre query: </FormLabel>
        <Input 
          name={'query-input'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputWrap>
      <InputWrap>
        {filter && 
          <Button type={'button'} onClick={() => setFilter(null)}>Reset Filter</Button>
        }
      </InputWrap>
      <TableContainer>
        <Table id={'data-table'}>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => setFilter('title')}>
                TITLE
              </TableCell>
              <TableCell>
                URL
              </TableCell>
              <TableCell onClick={() => setFilter('created_at')}>
                CREATED AT
              </TableCell>
              <TableCell>
                AUTHOR
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayPosts && displayPosts.map((item, index) => (
              <TableBodyRow key={index} onClick={() => handleModal(item)}>
                <EqualCell>
                  {item.title}
                </EqualCell>
                <EqualCell>
                  {item.url}
                </EqualCell>
                <EqualCell>
                  {item.created_at}
                </EqualCell>
                <EqualCell>
                  {item.author}
               </EqualCell>
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
        {displayPosts.length === 0 && 
          <p>Nothing matches the query</p>
        }
      </TableContainer>
    </TableWrap>
  );
}
