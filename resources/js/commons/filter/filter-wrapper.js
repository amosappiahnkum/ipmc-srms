import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Form, Input} from "antd";
import {FiFilter, FiPrinter} from "react-icons/fi";
import dayjs from "dayjs";

function FilterWrapper(props) {
    const {submitFilter, exportFilter, children, initialValue, excel, print, onClose, open} = props
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setLoading(true)
        values.export = false
        values.print = false
        setDateForFilter(values)
        submitFilter(new URLSearchParams(values)).then(() => setLoading(false))
    }

    const completeExport = (values) => {
        setLoading(true)
        setDateForFilter(values)
        exportFilter(new URLSearchParams(values)).then(() => setLoading(false))
    }


    const setDateForFilter = (values) => {
        if (values.date && values['date'][0] !== '') {
            values['date'] = [dayjs(values['date'][0]).format('YYYY-MM-DD'), dayjs(values['date'][1]).format('YYYY-MM-DD')]
        } else {
            values.date = 'null'
        }
    }
    const FilterTitle = () => (
        <div className={'flex gap-x-2 justify-start'}>
            <Button hidden={!excel} style={{background: "darkgreen", color: "white", borderColor: "darkgreen"}}
                    loading={loading}
                    onClick={() => {
                        form.setFieldsValue({export: true, print: false})
                        completeExport(form.getFieldsValue())
                    }}>
                Export
            </Button>
            <Button hidden={!print} icon={<FiPrinter/>} danger loading={loading} onClick={() => {
                form.setFieldsValue({print: true, export: false})
                completeExport(form.getFieldsValue())
            }}>
                &nbsp;Print
            </Button>
        </div>
    )
    return (
        <Form form={ form } onFinish={ onFinish } layout={ 'vertical' }
              initialValues={ {...initialValue, export: false} }>
            <Card title={ <FilterTitle/> }
                  extra={ [
                      <Button key={ 'filter' } icon={ <FiFilter/> } loading={ loading } htmlType={ 'submit' }
                              type={ 'primary' }>
                          &nbsp;Filter
                      </Button>
                  ] }>
                <Form.Item hidden name="export" label="export">
                    <Input/>
                </Form.Item>
                <Form.Item hidden name="print" label="print">
                    <Input/>
                </Form.Item>
                {
                    children &&
                    <>
                        { children }
                    </>
                }
            </Card>
        </Form>
    )
}

FilterWrapper.defaultProps = {
    print: false,
    excel: false,
    open: false,
}

FilterWrapper.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    print: PropTypes.bool,
    excel: PropTypes.bool,
    children: PropTypes.any,
    initialValue: PropTypes.object,
}


export default (FilterWrapper)
