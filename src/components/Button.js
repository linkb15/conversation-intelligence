import styled from 'styled-components';

export default styled.button`
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #d0d9e2;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: '${p => p.theme.font}';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #556C86;
  padding: 8px 20px;
  cursor: pointer;
`;
