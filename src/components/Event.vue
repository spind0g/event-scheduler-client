<template>
    <div>
        <h3 @click="select(event.id)">{{ event.name }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true,
        },

        select: {
            type: Function,
            required: true,
        },
    },
};
</script>
