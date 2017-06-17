import zerorpc


class CalcApi(object):
    def calc(self, text):
        try:
            return eval(text)
        except Exception as e:
            return 0.0

    def echo(self, text):
        return text


def main():
    addr = "tcp://127.0.0.1:4242"
    s = zerorpc.Server(CalcApi())
    s.bind(addr)
    print("Start running on {}".format(addr))
    s.run()

if __name__ == '__main__':
    main()