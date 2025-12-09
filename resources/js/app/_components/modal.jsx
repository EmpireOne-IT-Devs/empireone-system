import React from "react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "" }) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <div as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-2"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-2"
                    >
                        <div className={`relative w-full ${width} border-2 border-white max-h-[90vh] transform rounded-xl  p-6 text-left align-middle shadow-xl transition-all`}>
                            {/* Close button */}
                            <button
                                onClick={() => onClose(false)}
                                className="absolute top-3 right-6 text-3xl text-red-400 hover:text-red-600 transition-colors"
                            >
                                &times;
                            </button>

                            {/* Title */}
                            {title && (
                                <div
                                    as="h3"
                                    className="text-lg font-medium leading-6 mb-4 pr-8"
                                >
                                    {title}
                                </div>
                            )}

                            {/* Content */}
                            <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    );
}
