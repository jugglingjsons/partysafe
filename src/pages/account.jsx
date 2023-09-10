import React from 'react';
import { useSession, getSession } from 'next-auth/react';

const Account = () => {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>

                {/* Recent Orders Summary Box */}
                <div className="account-box">
                    <h2 className="box-title">Recent Orders</h2>
                    <div className="order-summary">
                        <p>Order #12345</p>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>Receiver: John Doe</p>
                        <p>Order Amount: $100.00</p>
                        <p>Status: Shipped</p>
                        <button className="action-button view-button">View Order</button>
                        <button className="action-button reorder-button">Reorder</button>
                    </div>
                </div>

                {/* Account Information Box */}
                <div className="account-box">
                    <h2 className="box-title">Account Information</h2>
                    <p>Name: {session.user.name}</p>
                    <p>Email: {session.user.email}</p>
                </div>

                {/* Newsletters Box */}
                <div className="account-box">
                    <h2 className="box-title">Newsletters</h2>
                    <p>Subscribed to newsletters: Yes</p>
                    <button className="action-button edit-newsletter-button">Edit Newsletter Subscription</button>
                </div>

                {/* Address Book Box */}
                <div className="account-box">
                    <h2 className="box-title">Address Book</h2>

                    {/* Default Billing Address */}
                    <div className="address-section">
                        <h3 className="address-subtitle">Default Billing Address</h3>
                        <p>Smaïl Bensaad</p>
                        <p>123 Main St</p>
                        <p>Berlin, Germany, 12043</p>
                        <button className="action-button edit-billing-button">Edit Billing Address</button>
                    </div>

                    {/* Default Shipping Address */}
                    <div className="address-section">
                        <h3 className="address-subtitle">Default Shipping Address</h3>
                        <p>Smaïl Bensaad</p>
                        <p>Karl-Marx-Straße 52</p>
                        <p>Berlin, Germany, 12043</p>
                        <button className="action-button edit-shipping-button">Edit Shipping Address</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn('google')}>Sign in</button>
            </div>
        );
    }
};

export default Account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
