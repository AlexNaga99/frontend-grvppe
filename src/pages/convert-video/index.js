
import React, { useEffect, useState } from "react";
import { Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Dragger } = Upload;

const ConvertVideo = () => {

  const [ loading, setLoading ] = useState(false);
  const [ path, setPath ] = useState();

  const go = (path) => {
    this.props.history.push(path);
  }

  const config = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:3001/video/file',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            setPath(info.fileList[0].response.path);
                message.success(`${info.file.name} enviado com sucesso.`);
        } 
        else if (status === 'error') {
              message.error(`${info.file.name} falhou ao tentar enviar.`);
        }
    },
  };

  return (
    <Dragger {...config}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Clique ou arraste para fazer upload do seu video.</p>
      <p className="ant-upload-hint">
      </p>
    </Dragger>
  )
}

export default ConvertVideo;