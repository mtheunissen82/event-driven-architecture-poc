#!/bin/sh

aws --endpoint http://localhost:4566 sqs create-queue --queue-name word-portion-begin
aws --endpoint http://localhost:4566 sqs create-queue --queue-name word-portion-middle
aws --endpoint http://localhost:4566 sqs create-queue --queue-name word-portion-end
