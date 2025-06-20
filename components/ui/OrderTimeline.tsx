import React from 'react';

interface OrderTimelineProps {
  status: 'pending' | 'placed' | 'shipped' | 'delivered' | 'canceled';
  createdAt: string;
  updatedAt?: string;
}

const timelineSteps = [
  {
    key: 'pending',
    label: 'Order Placed',
    description: 'Your order has been placed and is being processed',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    key: 'placed',
    label: 'Order Confirmed',
    description: 'Your order has been confirmed and is being prepared',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    key: 'shipped',
    label: 'Order Shipped',
    description: 'Your order is on its way to you',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    key: 'delivered',
    label: 'Order Delivered',
    description: 'Your order has been successfully delivered',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
];

const getStatusIndex = (status: string) => {
  const statusOrder = ['pending', 'placed', 'shipped', 'delivered'];
  return statusOrder.indexOf(status);
};

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  status,
  createdAt,
  updatedAt
}) => {
  const currentIndex = getStatusIndex(status);
  const isCanceled = status === 'canceled';

  if (isCanceled) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Order Status
        </h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-red-600 mb-2">Order Canceled</h4>
          <p className="text-gray-600">This order has been canceled</p>
          <p className="text-sm text-gray-500 mt-2">
            Canceled on: {new Date(updatedAt || createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Order Timeline
      </h3>
      
      <div className="relative">
        {timelineSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.key} className="flex items-start space-x-4 mb-6 last:mb-0">
              {/* Timeline Line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-6 top-10 w-0.5 h-16 bg-gray-200">
                  {isCompleted && (
                    <div className="w-full h-full bg-green-500 transition-all duration-500"></div>
                  )}
                </div>
              )}
              
              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
                {isCurrent && (
                  <p className="text-xs text-gray-500 mt-1">
                    Updated: {new Date(updatedAt || createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Estimated Delivery */}
      {status !== 'delivered' && status !== 'canceled' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
              <p className="text-sm text-gray-600">
                {(() => {
                  const orderDate = new Date(createdAt);
                  const estimatedDate = new Date(orderDate);
                  estimatedDate.setDate(estimatedDate.getDate() + 3);
                  return estimatedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                })()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline; 