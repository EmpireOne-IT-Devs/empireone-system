import { useState } from 'react';
import Button from '../../../../../_components/button';
import Input from '../../../../../_components/input';
import Modal from '../../../../../_components/modal';
import Select from '../../../../../_components/select';
import TextArea from '../../../../../_components/textarea';

export default function CreateSection() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        eventName: '',
        eventType: '',
        description: '',
        startDate: '',
        endDate: '',
        participantSource: 'manual',
        participants: '',
        csvFile: null,
        numberOfWinners: 1,
    });

    const [prizes, setPrizes] = useState([
        { name: '', quantity: 1, value: '' },
    ]);

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handlePrizeChange = (index, field, value) => {
        const updated = [...prizes];
        updated[index][field] = value;
        setPrizes(updated);
    };

    const addPrize = () =>
        setPrizes([...prizes, { name: '', quantity: 1, value: '' }]);

    const removePrize = (index) => {
        if (prizes.length > 1) {
            setPrizes(prizes.filter((_, i) => i !== index));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.eventName.trim())
            newErrors.eventName = 'Event name is required';

        if (!formData.eventType) newErrors.eventType = 'Event type is required';

        if (!formData.startDate) newErrors.startDate = 'Start date is required';

        if (!formData.endDate) newErrors.endDate = 'End date is required';

        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            newErrors.endDate = 'End date must be after start date';
        }

        if (formData.numberOfWinners <= 0) {
            newErrors.numberOfWinners = 'Number of winners must be at least 1';
        }

        if (
            formData.participantSource === 'manual' &&
            !formData.participants.trim()
        ) {
            newErrors.participants =
                'Participants are required for manual mode';
        }

        if (formData.participantSource === 'csv' && !formData.csvFile) {
            newErrors.csvFile = 'CSV file is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCsvUpload = (e) => {
        const file = e.target.files[0] || null;
        setFormData((prev) => ({ ...prev, csvFile: file }));
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const validPrizes = prizes.filter((p) => p.name.trim());

        const eventData = {
            ...formData,
            participants:
                formData.participantSource === 'manual'
                    ? formData.participants.split(',').map((p) => p.trim())
                    : [],

            prizes: validPrizes,
        };

        console.log('Event Data:', eventData);

        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);

        setTimeout(() => {
            setFormData({
                eventName: '',
                eventType: '',
                description: '',
                startDate: '',
                endDate: '',
                participantSource: 'manual',
                participants: '',
                csvFile: null,
                numberOfWinners: 1,
            });
            setPrizes([{ name: '', quantity: 1, value: '' }]);
            setErrors({});
        }, 200);
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
                onClose={handleCloseModal}
                title="Create Event"
                width="max-w-6xl"
            >
                <div className="space-y-4 my-5">
                    <Input
                        label="Event Name"
                        name="eventName"
                        value={formData.eventName}
                        onChange={(e) =>
                            handleInputChange('eventName', e.target.value)
                        }
                        required
                        error={errors.eventName}
                    />

                    <Select
                        label="Event Type"
                        name="eventType"
                        value={formData.eventType}
                        onChange={(e) =>
                            handleInputChange('eventType', e.target.value)
                        }
                        options={[
                            { value: 'raffle', label: 'Raffle' },
                            { value: 'contest', label: 'Contest' },
                            { value: 'company-event', label: 'Company Event' },
                            {
                                value: 'recognition',
                                label: 'Recognition Event',
                            },
                        ]}
                        error={errors.eventType}
                        required
                    />

                    <TextArea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                            handleInputChange('description', e.target.value)
                        }
                        error={errors.description}
                        rows={3}
                    />

                    <div className="flex gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={(e) =>
                                handleInputChange('startDate', e.target.value)
                            }
                            required
                            error={errors.startDate}
                        />
                        <Input
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={(e) =>
                                handleInputChange('endDate', e.target.value)
                            }
                            required
                            error={errors.endDate}
                        />
                    </div>

                    {formData.participantSource === 'manual' && (
                        <Input
                            label="Participants"
                            name="participants"
                            placeholder="Enter names separated by commas"
                            value={formData.participants}
                            onChange={(e) =>
                                handleInputChange(
                                    'participants',
                                    e.target.value,
                                )
                            }
                            error={errors.participants}
                        />
                    )}

                    {formData.participantSource === 'csv' && (
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Upload CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleCsvUpload}
                            />
                            {errors.csvFile && (
                                <p className="text-sm text-red-500">
                                    {errors.csvFile}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Prizes
                        </label>
                        {prizes.map((p, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-3 space-y-2 rounded border bg-gray-50 p-3"
                            >
                                <Input
                                    label={`Prize ${idx + 1} Name`}
                                    value={p.name}
                                    onChange={(e) =>
                                        handlePrizeChange(
                                            idx,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                />
                                <Input
                                    label="Quantity"
                                    type="number"
                                    min={1}
                                    value={p.quantity}
                                    onChange={(e) =>
                                        handlePrizeChange(
                                            idx,
                                            'quantity',
                                            Number(e.target.value),
                                        )
                                    }
                                />
                                <Input
                                    label="Value (Optional)"
                                    placeholder="₱ Amount or description"
                                    value={p.value}
                                    onChange={(e) =>
                                        handlePrizeChange(
                                            idx,
                                            'value',
                                            e.target.value,
                                        )
                                    }
                                />
                                {prizes.length > 1 && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-1/8"
                                        onClick={() => removePrize(idx)}
                                    >
                                        Remove Prize
                                    </Button>
                                )}
                            </div>
                        ))}
                        <div className="my-4 flex justify-end">
                            <Button
                                variant="success"
                                size="sm"
                                onClick={addPrize}
                            >
                                + Add Prize
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-4">
                        {/* <Button variant="outline" onClick={handleCloseModal}>
                            Cancel
                        </Button> */}
                        <Button variant="primary" onClick={handleSubmit}>
                            Save Event
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
