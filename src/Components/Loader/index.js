import { Spin } from 'antd';
import './loader.css';

const Loader = (props) => {
  return (
    <div className="loader-container-height">
      {
        props.renderSpinner ? (
          <div className="loader-container">
            <Spin size="large"/>
          </div>
        ) 
        : 
        (props.children)
      }
    </div>
  );
}

export default Loader;
