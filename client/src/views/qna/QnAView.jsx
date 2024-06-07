import React from 'react';
import QnASection from '@/components/qna/QnASection';
import FindLocation from '@/components/layout/FindLocation'


const QnAView = () => {
    return (
        <div>
            <FindLocation/>
            <QnASection />
        </div>
    );
};

export default QnAView;