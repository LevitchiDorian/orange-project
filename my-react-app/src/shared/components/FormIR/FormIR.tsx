import React from 'react';
import styled from 'styled-components'
import { Form, Input, InputNumber, Select } from "antd";

interface FormValues {
  name: string;
  phone: string;
  location: string;
}

const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 90 }}>
        <Option value="373">+373</Option>
      </Select>
    </Form.Item>
  );

  const CustomButton = styled.button`
  background-color: #FFEFDD; /* Default background color */
  color: #181a1b; /* Default text color */
  border: 2px solid #FFEFDD; /* Match border with background */
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Smooth hover effect */

  &:hover {
    background-color: #f9cc98; /* Hover background color */
    color: #181a1b; /* Hover text color */
    border-color: #f9cc98; /* Match border with hover background */
  }
`;

const FormIR: React.FC = () => {

    const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values);
  };

  return (
    <div className='form-container'>
      <div className="restaurant-details">
        <img src="restaurant-logo.png" alt="" className='r-logo' />
        <h2 className="r-name">#Restaurant</h2>
      </div>
      <div className="form-content">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          size="large"
          onFinish={onFinish}
          className='custom-label'
        >
          <Form.Item 
            label="Nume/Prenume"
            name="name"
            rules={[{ required: true, message: 'Va rog introduce-ti Nume/Prenume' }]}
          >
            <Input placeholder="Introduce Nume/Prenume" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: 'Va rog introduce-ti un numar de contact!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-Mail"
            rules={[{ type: 'email', required: true, message: 'Va rog introduce-ti un E-mail!' }]}
          >
            <Input placeholder="Introduce E-mail"/>
          </Form.Item>

          <Form.Item
            label="Filiala"
            name="location"
            rules={[{ required: true, message: 'Va rog selectati o filiala' }]}
          >
            <Select placeholder="Selectati filiala">
              <Select.Option value="location1">Filiala 1</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mese disponibile"
            name="tables"
            rules={[{ required: true, message: 'Va rog selectati o masa!' }]}
          >
            <Select placeholder="Selectati masa disponibila">
              <Select.Option value="table">Masa 1</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
            label="Numar Persoane"
            name="persons"
            rules={[{ required: true, message: 'Va rog introduce-ti numarul persoanelor!'}]}
            >
            <InputNumber /> 
          </Form.Item>

          <Form.Item
            name={['text', 'preferinte']} 
            label="Preferinte"
          >
            <Input.TextArea/>
          </Form.Item>
          
          <Form.Item className='btn-form'>
            <CustomButton>
              Continua
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormIR;
