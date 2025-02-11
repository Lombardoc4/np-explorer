import styled from 'styled-components';

export const FormResults = styled.ul`
  border: 1px solid #bdbdbd;
  border-top: none;
  border-radius: 0 0 var(--def-input-border-radius)
    var(--def-input-border-radius);
  position: absolute;
  top: 100%;
  width: calc(100% + 2px);
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Item = styled.li`
  color: #000;
  text-align: left;
  padding: 0.75em 1.5em;
  cursor: pointer;
  &.hover {
    background-color: #eee;
  }
`;
