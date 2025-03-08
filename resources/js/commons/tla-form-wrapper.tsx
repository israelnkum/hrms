import React, {useState} from "react";
import {Button, Form, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {TlaModal} from "./pop-ups/tla-modal";
import CloseModal from "./close-modal";
import {TlaError, TlaSuccess} from "../utils/messages";
import {AsyncThunk, unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks";

// Define types for the props
interface TlaFormWrapperProps {
    onSubmit: AsyncThunk<any, any, any>;
    initialValues?: Record<string, any>;
    formTitle: string;
    children: React.ReactNode;
    file?: File | null;
    width?: number;
    customForm?: Form | null;
}

const TlaFormWrapper: React.FC<TlaFormWrapperProps> =
    ({
         onSubmit,
         initialValues,
         formTitle,
         children,
         file = null,
         width = 520,
         customForm = null,
     }) => {
        const navigate = useNavigate();
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);
        const dispatch = useAppDispatch()
        const submit = (values: Record<string, any>) => {
            setLoading(true);
            const formData = new FormData();
            if (values.id !== 0) formData.append("_method", "PUT");
            if (file !== null) formData.append("file", file);

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    formData.append(key, values[key]);
                }
            }

            dispatch(onSubmit(formData))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                    TlaSuccess();
                    customForm ? customForm.resetFields() : form.resetFields();
                    navigate(-1);
                })
                .catch((error) => {
                    setLoading(false);
                    TlaError(error?.response?.data?.message);
                });
        };

        return (
            <TlaModal title={formTitle} width={width}>
                <Spin spinning={loading} tip={"Please Wait"}>
                    <Form
                        form={customForm ? customForm : form}
                        onFinish={(values) => submit(values)}
                        layout="vertical"
                        name="createForm"
                        initialValues={initialValues}
                    >
                        {children}
                        <div className={"flex gap-x-2 justify-end"}>
                            <CloseModal/>
                            <Button
                                size={"large"}
                                block
                                type="primary"
                                className={"btn-primary"}
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Spin>
            </TlaModal>
        );
    };

export default TlaFormWrapper;
