import {
    get_accounting_cash_flows_thunk,
    get_daily_expenses_thunk,
} from '@/app/redux/accounting-thunk';
import store from '@/app/store/store';
import { useEffect } from 'react';
import Layout from '../../../layout';
import ExpensesLayout from '../layout';
import TableSection from './_sections/table-section';



export default function Page() {
    useEffect(() => {
        store.dispatch(get_daily_expenses_thunk());
        store.dispatch(get_accounting_cash_flows_thunk());
    }, []);
    return (
        <Layout>
            <ExpensesLayout>
                <TableSection/>
            </ExpensesLayout>
        </Layout>
    );
}
