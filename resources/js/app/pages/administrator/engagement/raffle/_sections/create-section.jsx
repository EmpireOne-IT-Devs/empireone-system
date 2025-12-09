import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Button from '../../../../../_components/button';
import Modal from '../../../../../_components/modal';
import { Input } from '../../../../../components/input';
import Textarea from '../../../../../components/textarea';

export default function CreateSection() {
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            start_at: '',
            end_at: '',
            prizes: [{ name: '', quantity: null, description: '' }],
        },
        mode: 'onSubmit',
    });

    const {
        fields: prizeFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'prizes',
    });

    const onSubmit = (data) => {
        if (data.start_at && data.end_at && data.start_at > data.end_at) {
            setError('end_at', {
                type: 'manual',
                message: 'End date must be after start date',
            });
            return;
        }

        const validPrizes = data.prizes.filter((p) => p.name?.trim());

        const eventData = {
            ...data,
            prizes: validPrizes,
        };

        console.log('Event Data:', eventData);
        setShowModal(false);
    };

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <Button
                    className="px-6 py-2"
                    variant="success"
                    onClick={() => setShowModal(true)}
                >
                    Create Event
                </Button>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Create Event"
                width="max-w-3xl"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-5 space-y-4">
                        <Input
                            label="Event Name"
                            placeholder="Event Name"
                            {...register('name', {
                                required: 'Event name is required',
                            })}
                            error={errors.name?.message}
                        />

                        <Textarea
                            label="Description"
                            placeholder="Describe the event..."
                            {...register('description', {
                                required: 'Event description is required',
                            })}
                            error={errors.description?.message}
                            rows={3}
                        />

                        <div className="flex gap-4">
                            <Input
                                label="Start Date"
                                type="date"
                                {...register('start_at', {
                                    required: 'Start date is required',
                                })}
                                error={errors.start_at?.message}
                            />
                            <Input
                                label="End Date"
                                type="date"
                                {...register('end_At', {
                                    required: 'End date is required',
                                })}
                                error={errors.end_At?.message}
                            />
                        </div>

                        {/* Prizes */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Prizes
                            </label>
                            {prizeFields.map((p, idx) => (
                                <div
                                    key={p.id}
                                    className="flex flex-col gap-3 space-y-2 rounded border p-3"
                                >
                                    <Input
                                        label={`Prize ${idx + 1} Name`}
                                        placeholder="Prize Name"
                                        {...register(`prizes.${idx}.name`, {
                                            required: 'Field is required',
                                        })}
                                        error={
                                            errors.prizes?.[idx]?.name?.message
                                        }
                                    />
                                    <Input
                                        label="Quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        min={1}
                                        {...register(`prizes.${idx}.quantity`, {
                                            valueAsNumber: true,
                                            required: 'Field is required',
                                            min: {
                                                value: 1,
                                                message:
                                                    'Quantity must be at least 1',
                                            },
                                        })}
                                        error={
                                            errors.prizes?.[idx]?.quantity
                                                ?.message
                                        }
                                    />
                                    <Input
                                        label="Description"
                                        placeholder="Description"
                                        {...register(
                                            `prizes.${idx}.description`,
                                            {
                                                required: 'Field is required',
                                            },
                                        )}
                                        error={
                                            errors.prizes?.[idx]?.description
                                                ?.message
                                        }
                                    />

                                    {prizeFields.length > 1 && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="w-1/6 py-2"
                                            onClick={() => remove(idx)}
                                        >
                                            Remove Prize
                                        </Button>
                                    )}
                                </div>
                            ))}

                            <div className="my-4 flex justify-end">
                                <Button
                                    variant="success"
                                    className="py-2"
                                    size="sm"
                                    onClick={() =>
                                        append({
                                            name: '',
                                            quantity: null,
                                            description: '',
                                        })
                                    }
                                >
                                    + Add Prize
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t pt-4">
                            <Button variant="primary" type="submit">
                                Save Event
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
