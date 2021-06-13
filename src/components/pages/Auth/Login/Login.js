import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import {
    Row,
    Col,
    InputGroup,
    Button,
    Container,
    Card,
    Form,
} from 'react-bootstrap'
import { getErrorMessage } from '@helpers/helperError'
import { APP_TOKEN } from '@config/settings'
import './Login.scss'
import { ServiceFactory } from '@services/ServiceFactory'
import { types } from '@types/types'

const AuthService = ServiceFactory.get('auth')

const validationSchema = Yup.object({
    email: Yup.string().required('El campo es requerido'),
    password: Yup.string().required('El campo es requerido'),
})

const Login = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                /* eslint camelcase: "off" */
                const response = await AuthService.login(values);
                setSubmitting(false)
               
                if (response?.data) {
                    const  {  umbral_token, user } = response?.data;
                    const ACCESS_TOKEN = umbral_token;
                    await dispatch({
                        type: types.login,
                        payload: user,
                    })

                    await sessionStorage.setItem(APP_TOKEN, ACCESS_TOKEN)

                } 
            } catch (errors) {
                setSubmitting(false);
                console.log({errors});
                alert(getErrorMessage(errors))
            }
        },
    })

    return (
        <div>
            <div className="vertical-center-login">
                <Container>
                    <Row>
                        <Col
                            xs={{ span: 10, offset: 1 }}
                            sm={{ span: 10, offset: 1 }}
                            md={{ span: 10, offset: 1 }}
                            lg={{ span: 8, offset: 2 }}
                            xl={{ span: 8, offset: 2 }}
                        >
                            <Card className="login">
                                <Card.Body>
                                    <Card.Title>
                                        <h4>Login</h4>
                                    </Card.Title>
                                    <Form
                                        autoComplete="off"
                                        noValidate
                                        onSubmit={formik.handleSubmit}
                                    >
                                        <Form.Group as={Row}>
                                            <Form.Label column md="4">
                                                Email:
                                            </Form.Label>

                                            <Col md="8">
                                                <InputGroup>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Email"
                                                        autoComplete="new-chat-email"
                                                        isInvalid={
                                                            !!(
                                                                formik?.touched
                                                                    ?.email &&
                                                                formik?.errors
                                                                    ?.email
                                                            )
                                                        }
                                                        {...formik.getFieldProps(
                                                            'email'
                                                        )}
                                                    />

                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.email}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column md="4">
                                                Contraseña:
                                            </Form.Label>
                                            <Col md="8">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    autoComplete="new-chat-password"
                                                    isInvalid={
                                                        !!(
                                                            formik?.touched
                                                                ?.password &&
                                                            formik?.errors
                                                                ?.password
                                                        )
                                                    }
                                                    {...formik.getFieldProps(
                                                        'password'
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors?.password}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>

                                        <Row className="row justify-content-md-end ">
                                            <Col
                                                xs={4}
                                                sm={4}
                                                md={2}
                                                lg={2}
                                                xl={2}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        formik.isSubmitting
                                                    }                                                   
                                                    className={`float-right ${
                                                        !(
                                                            formik.isValid &&
                                                            formik.dirty
                                                        ) && 'soft-disable'
                                                    }`}
                                                >
                                                    Ingresar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col
                            xs={{ span: 10, offset: 1 }}
                            sm={{ span: 8, offset: 2 }}
                            md={{ span: 8, offset: 2 }}
                            lg={{ span: 6, offset: 3 }}
                            xl={{ span: 6, offset: 3 }}
                            style={{ textAlign: 'right' }}
                        >
                            <div
                                style={{
                                    textAlign: 'right',
                                    paddingRight: '2rem',
                                }}
                            ></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Login
