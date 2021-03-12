
import React, { useEffect, useState } from "react";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Dragger } = Upload;

const ConvertDocuments = () => {

  const [ path, setPath ] = useState();

  const config = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:3001/document/file',
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
      <p className="ant-upload-text">Clique ou arraste para fazer upload do seu documento.</p>
      <p className="ant-upload-hint">
      </p>
    </Dragger>
  )
}

export default ConvertDocuments;